import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const { userId, content } = body;

  const sanitized = content.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return {
    statusCode: 200,
    body: JSON.stringify({
      userId,
      content: sanitized,
    }),
  };
};