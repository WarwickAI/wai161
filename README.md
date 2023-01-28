# Welcome to WAI161's GitHub repository!

This repository contains the course materials for the course WAI161: Introduction to Software Egnineering.

## Tutorial Code

The complete code for each tutorial is available in the `tutorial-code-<x>` directories.

To run the code, you will need to have installed the pre-requisites covered in [Tutorial 0 here](https://medium.com/warwick-artificial-intelligence/wai261-tutorial-0-setting-up-vscode-git-and-nodejs-71ed3e0ef3d3).

To run the code, clone this repository and then run `npm install` in the directory of the tutorial you want to run (e.g. `tutorial-1-code`). Once the dependencies have been installed, you can run the code using `npm run dev` (again in the specific tutorial's code directory).

**For the code in tutorials 3 and onwards, you will need to also run `npx prisma migrate dev` to set up the database (as explained in the slides in tutorial 3).**

**Make sure to set-up the environment variables in a `.env` file in the root of the repository. You can use the `.env.example` file as a template.**

**Make sure to replace the Hugging Face API key in `src/server/trpc/router/message.ts` since this one has been disabled.**

## Tutorial Slides

The slides for each tutorial are available in the `tutorial-slides-<x>` PDFs. These may have some updates from the live tutorial, or may include information not covered due to time constraints.

## General Resources

Here are some useful links for the course:

- [WAI161 Course Website](https://warwick.ai/wai161/)
- [React](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Prisma](https://www.prisma.io/)
