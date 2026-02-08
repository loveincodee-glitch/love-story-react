let answers = [];

export async function handler(event) {

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const data = JSON.parse(event.body);

  answers.push({
    ...data,
    time: new Date().toISOString(),
  });

  console.log("Saved:", data);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
}
