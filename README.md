# 💬 Real-Time Chat App

A simple real-time chat application with:

- ✅ **NestJS backend** (WebSocket gateway + MySQL)
- 🚀 **AWS Lambda integration**
- 🧪 **Basic frontend** with HTML/JS for testing
- 🐳 **Docker-based** setup

---

## 📁 Project Structure

```
.
├── backend/      # NestJS backend
├── lambda/       # AWS Lambda function (SAM)
├── db/           # AWS SAM template for deploying MySQL RDS database
├── public/       # Simple frontend (HTML + JS)
└── README.md     # You are here
```

---

## ⚙️ 1. MySQL Configuration

#### ☁️ Deploying MySQL Database to AWS with SAM

Thу db folder contains an AWS SAM template for deploying a standalone MySQL database instance on AWS RDS.

#### ✅ Prerequisites

- AWS CLI installed and configured (`aws configure`)
- AWS SAM CLI installed
- A valid AWS account with permission to create VPC-related and RDS resources
- Your VPC ID (found in AWS Console → VPC → Your VPCs)

#### 🚀 Step 1: Deploy the Database

Use the command below to deploy the RDS instance using the provided CloudFormation template:

```bash
sam deploy \
  --template-file db/rds.yaml \
  --stack-name chat-db \
  --parameter-overrides DBPassword=yourStrongPassword VPCID=your-vpc-id \
  --capabilities CAPABILITY_IAM
```

> Replace `yourStrongPassword` with your desired DB password and `your-vpc-id` with your actual VPC ID.

#### 📥 Step 2: Retrieve Configuration Values

After deployment completes, you’ll get outputs like:

- **RDS Endpoint** – e.g., `chat-db-instance.xxxxxx.us-east-1.rds.amazonaws.com`
- **Port** – usually `3306`
- **Username** – `admin`
- **Database Name** – `chat`

#### ⚙️ Step 3: Configure `docker-compose.yml`

Edit your backend service's environment section like this:

```yaml
    environment:
      DB_HOST: chat-db-instance.xxxxxx.us-east-1.rds.amazonaws.com
      DB_PORT: 3306
      DB_USERNAME: admin
      DB_PASSWORD: yourStrongPassword
      DB_NAME: chat
```

Make sure this matches the credentials you used in the SAM template.

---

## ☁️ 2. Deploy Lambda with AWS SAM

**🔐 Prerequisite:** Make sure your AWS CLI is configured with credentials.

Run the following if not already configured:

```bash
aws configure
```

You'll be prompted for:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., `us-east-1`)
- Output format (`json`)


Make sure [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) are installed.

Then run:

```bash
cd lambda
sam build
sam deploy --guided
```

During `sam deploy --guided`:

- Enter your **stack name**
- Choose your **AWS region**
- Accept default options unless you know what to change

After deployment:

- Copy the generated **API Gateway endpoint**
- Update it in `.env` under `LAMBDA_ENDPOINT`

---

## 🐳 3. Run Locally with Docker

From the root of the project:

```bash
docker-compose build
docker-compose up
```

- Backend: [http://localhost:3000](http://localhost:3000)
- Frontend: [http://localhost:8080](http://localhost:8080)

---

## 🖥️ 4. Frontend Usage

1. Open [http://localhost:8080](http://localhost:8080) in **two tabs**
2. Type messages in one tab — they'll appear in real-time in the other
3. Scroll to load more messages (pagination is implemented)
4. App is deployed on AWS and it can be reached via http://34.229.20.222:8080/

---

## ✨ Features

- 🔄 Real-time messaging with **WebSocket (Socket.IO)**
- 💾 Messages saved to **MySQL**
- ⚡ Message processing via **AWS Lambda**
- ⬇️ Paginated message history
- 🌐 Frontend demo for quick testing

---

## 🧩 Tech Stack

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Socket.IO](https://socket.io/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)

---