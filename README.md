## Serverless Image Filter and Style Transformer

This is a severless application to apply filters or style-transferring on your image. The application is built with React alongside Tailwind CSS as frontend and Amazon API Gateway with AWS Lambda and Amazon S3 as backend.

You can access this web application via either one of the links below:
1. AWS Amplify: https://master.dc7f2f3f6kg12.amplifyapp.com/
2. Netifly: https://serverlessimagefilter.netlify.app/



To run this application locally, 
1. run `npm install` to install all the required packages
2. add a `.env` file and fill in your Amazon S3 bucket information
    (1) REACT_APP_AWS_ACCESS_KEY_ID
    (2) REACT_APP_AWS_ACCESS_KEY_SECRET
    (3) REACT_APP_AWS_S3_REGION
    (4) REACT_APP_AWS_S3_BUCKET
3. run `npm run start` to start the application


