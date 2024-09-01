# Appwrite Cloud Function

Setup App write cloud function to trigger the render job.

## Setup ngrok
1. Install ngrok:  Download and install ngrok from the official website: https://ngrok.com/download
2. Start ngrok: Open a terminal and run the following command:
```bash
ngrok tcp 5672
```
make sure you have completed the setup of `rabbitmq` from the readme.md file in the root folder and the port name in above command matches the port name in above command.
3. Copy the ngrok URL, port and update `.env` file. Also check other values in `.env` file and update accordingly.

## Setup appwrite cloud function

1. Create an appwrite account and go to [appwrite console](https://cloud.appwrite.io/).
2. Create a new project.
![Create a new project](https://appwrite.io/images/docs/quick-starts/create-project.png)
2. Add a platform (Web app)
![Add a platform](https://appwrite.io/images/docs/quick-starts/add-platform.png)
4. Create api key:
![Create api key](https://appwrite.io/images/docs/platform/create-api-key.png)
3. Create a new cloud function and setup github repo.
![Create a new cloud function](https://appwrite.io/images/docs/functions/template.png)

Go to following links to see detailed steps:
* [Create new Project](https://appwrite.io/docs/tutorials/react/step-3)
* [Create new API Key](https://appwrite.io/docs/advanced/platform/api-keys)
* [Create new Cloud Function](https://appwrite.io/docs/products/functions)

Once the cloud function is created and git repo setup is done,
go to the github repo and copy the code from the file `src/index.js`, `.env` and `package.json` from this folder into github repo.

## next steps
Check the readme in the root folder for next steps.










