import fs from 'fs';
import path from 'path';

export class EnvManager {
  private envPath: string;

  constructor() {
    this.envPath = path.join(process.cwd(), '.env');
  }

  /**
   * Lee el archivo .env y devuelve su contenido como objeto
   */
  public readEnvFile(): Record<string, string> {
    try {
      const envContent = fs.readFileSync(this.envPath, 'utf8');
      const envVars: Record<string, string> = {};
      
      envContent.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Remover comillas
            envVars[key.trim()] = value;
          }
        }
      });
      
      return envVars;
    } catch (error) {
      console.error('Error reading .env file:', error);
      return {};
    }
  }

  /**
   * Actualiza una variable en el archivo .env
   */
  public updateEnvVariable(key: string, value: string): boolean {
    try {
      const envVars = this.readEnvFile();
      envVars[key] = value;
      
      // Escribir de vuelta al archivo
      const envContent = Object.entries(envVars)
        .map(([k, v]) => `${k}=${v}`)
        .join('\n');
      
      fs.writeFileSync(this.envPath, envContent, 'utf8');
      
      // Actualizar process.env en tiempo real
      process.env[key] = value;
      
      return true;
    } catch (error) {
      console.error('Error updating .env file:', error);
      return false;
    }
  }

  /**
   * Actualiza múltiples variables en el archivo .env
   */
  public updateMultipleEnvVariables(variables: Record<string, string>): boolean {
    try {
      const envVars = this.readEnvFile();
      
      // Actualizar las variables
      Object.entries(variables).forEach(([key, value]) => {
        envVars[key] = value;
        process.env[key] = value; // Actualizar process.env en tiempo real
      });
      
      // Escribir de vuelta al archivo
      const envContent = Object.entries(envVars)
        .map(([k, v]) => `${k}=${v}`)
        .join('\n');
      
      fs.writeFileSync(this.envPath, envContent, 'utf8');
      
      return true;
    } catch (error) {
      console.error('Error updating multiple .env variables:', error);
      return false;
    }
  }

  /**
   * Obtiene el valor actual de una variable de entorno
   */
  public getEnvVariable(key: string): string | undefined {
    return process.env[key];
  }

  /**
   * Obtiene todas las variables de entorno del archivo .env
   */
  public getAllEnvVariables(): Record<string, string> {
    return this.readEnvFile();
  }
}
