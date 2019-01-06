SETUP DEVELOPMENT ENVIROMENT:
-Clone the "msr_node_teamd" repository using any of
    -GitHub Desktop
    -Visual Studio Code
    Or just download the whole repository if nothing else work
-Run the "RUN_AS_ADMIN" script in this folder as administrator, which:
    -installs node
    -installs git
    runs console command: npm install (this won't work if you move the script file)
-Open the "msr_node_teamd" folder in Visual Studio Code
    -I recommend opening the built-in terminal (View > Terminal)

*If your cloning the repository onto a machine that already has its enviroment set up (has node .etc)
you will still need to run: npm install
this will download and install all of the node dependencies listed in the package.json file

VERSION CONTROL OPTIONS:
-GitHub Desktop (you might need to generate git credentials in the VSTS clone tab)
-Visual Studio Codes built-in version control.
-Console Commands: https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html

DEVELOPMENT PROCESS:
-Run: nodemon app.js
    -Now everytime you change a file it will restart the server for you
    -Ctrl+C in the terminal will prompt you to stop the server.

CLONE BRANCH:
git clone -b BRANCHNAME https://memorabledillan.visualstudio.com/TeamD/_git/msr_node_d

    