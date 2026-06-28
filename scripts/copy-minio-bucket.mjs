import { Client } from "minio"

const accessKey = process.env.MINIO_ACCESS_KEY || "minioadmin"
const secretKey = process.env.MINIO_SECRET_KEY || "strong-password"
const bucket = process.env.MINIO_BUCKET_NAME || "vi-to"

const oldEndpoint = process.env.OLD_MINIO_ENDPOINT || "94.182.250.118:9000"
const newEndpoint = process.env.NEW_MINIO_ENDPOINT || "94.101.185.168:9000"

function makeClient(endpoint) {
  const [host, port = "9000"] = endpoint.replace(/^https?:\/\//, "").split(":")
  return new Client({
    endPoint: host,
    port: Number(port),
    useSSL: endpoint.startsWith("https://"),
    accessKey,
    secretKey,
  })
}

async function ensureBucket(client) {
  const exists = await client.bucketExists(bucket)
  if (!exists) await client.makeBucket(bucket)
}

async function listObjects(client) {
  const objects = []
  const stream = client.listObjectsV2(bucket, "", true)

  for await (const object of stream) {
    if (object.name) objects.push(object.name)
  }

  return objects
}

async function copyObject(oldClient, newClient, objectName) {
  const stat = await oldClient.statObject(bucket, objectName)
  const stream = await oldClient.getObject(bucket, objectName)
  await newClient.putObject(bucket, objectName, stream, stat.size, stat.metaData)
}

async function main() {
  const oldClient = makeClient(oldEndpoint)
  const newClient = makeClient(newEndpoint)

  await ensureBucket(newClient)
  const objects = await listObjects(oldClient)

  let copied = 0
  for (const objectName of objects) {
    await copyObject(oldClient, newClient, objectName)
    copied += 1
    console.log(`Copied ${copied}/${objects.length}: ${objectName}`)
  }

  console.log(JSON.stringify({ bucket, oldEndpoint, newEndpoint, copied }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
