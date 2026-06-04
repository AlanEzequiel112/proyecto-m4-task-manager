import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { VercelRequest, VercelResponse } from "@vercel/node";

interface TaskSummaryRequest {
  email?: string;
  tasks?: {
    title: string;
    description: string;
    completed: boolean;
  }[];
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    return response.status(405).json({
      message: "Método no permitido.",
    });
  }

  try {
    const body = request.body as TaskSummaryRequest;

    if (!body.email || !body.tasks) {
      return response.status(400).json({
        message: "Faltan datos para enviar el email.",
      });
    }

    if (
      !process.env.AWS_REGION ||
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_SECRET_ACCESS_KEY ||
      !process.env.AWS_SES_FROM_EMAIL
    ) {
      return response.status(500).json({
        message: "Faltan variables de entorno de AWS.",
      });
    }

    const sesClient = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const completedTasks = body.tasks.filter((task) => task.completed).length;
    const pendingTasks = body.tasks.filter((task) => !task.completed).length;

    const taskList = body.tasks
      .map((task) => {
        const icon = task.completed ? "✅" : "⏳";
        const status = task.completed ? "Completada" : "Pendiente";

        return `${icon} ${task.title}

Estado: ${status}

${task.description}`;
      })
      .join("\n\n────────────────────\n\n");

    const command = new SendEmailCommand({
      Source: process.env.AWS_SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [body.email],
      },
      Message: {
        Subject: {
          Data: "Resumen de tus tareas",
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `📋 Resumen de tareas

✅ Completadas: ${completedTasks}
⏳ Pendientes: ${pendingTasks}

────────────────────

${taskList}

────────────────────

Generado automáticamente por Task Manager`,
            Charset: "UTF-8",
          },
        },
      },
    });

    await sesClient.send(command);

    return response.status(200).json({
      message: "Email enviado correctamente.",
    });
  } catch (error) {
    console.error("SES ERROR:", error);

    return response.status(500).json({
      message: "No se pudo enviar el email.",
    });
  }
}