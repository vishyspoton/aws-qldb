# AWS QLDB

## Pre-requistites

1. Create an IAM Access Key from the `AWS Console` -> `My Security Credentials` -> `New Access Key`
2. Install AWS CLI on the Linux machine from [here](https://docs.aws.amazon.com/qldb/latest/developerguide/accessing.html)
3. Run ```aws configure``` and enter the access key, secret key when prompted
4. This shall create a config file under `~/.aws/config`

## Run
The run command uses the info. from the config file created above to access the QLDB API
```sh
node index.js
```
