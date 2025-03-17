import { exec } from 'child_process';

function _exec(command, options) {
   return new Promise((resolve, reject) => {
      exec(command, options, (error, _, __) => {
         if (error) {
            reject(error);
            return;
         }

         resolve();
      });
   });
}

export default _exec;
