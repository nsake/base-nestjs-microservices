import * as os from 'os';
import * as _cluster from 'node:cluster';
import { Cluster, Worker } from 'node:cluster';
import { Injectable, Logger } from '@nestjs/common';

const cluster = _cluster as unknown as Cluster;

@Injectable()
export class AppClusterService {
  private static readonly numCPUs = Math.ceil(os.cpus().length * 0.8); // 80%
  private static readonly logger = new Logger(AppClusterService.name);
  private static workerIndexes: Record<number, number> = {};

  static clusterize(callback: () => void): void {
    if (cluster.isPrimary) {
      this.logger.verbose(
        `Primary server started on process ID: ${process.pid}`,
      );
      this.forkWorkers();
    } else {
      this.logger.verbose(
        `Worker server started on process ID: ${process.pid}`,
      );
      callback();
    }
  }

  private static forkWorkers(): void {
    for (let i = 0; i < this.numCPUs; i++) {
      this.forkWorker(i);
    }

    cluster.on('exit', (worker: Worker, code: number, signal: string) => {
      if (!worker.process.pid) return;

      this.logger.warn(
        `Worker ${worker.process.pid} died (code: ${code}, signal: ${signal}). Restarting...`,
      );

      const index = this.workerIndexes[worker.process.pid];
      delete this.workerIndexes[worker.process.pid];
      this.forkWorker(index);
    });
  }

  private static forkWorker(index: number): void {
    try {
      const workerEnv = {
        WORKER_INDEX: index.toString(),
      };

      const worker = cluster.fork(workerEnv);

      if (!worker.process.pid) return;

      this.logger.verbose(`Forked worker with PID: ${worker.process.pid}`);
      this.workerIndexes[worker.process.pid] = index;
    } catch (error) {
      this.logger.error('Error forking worker', error);
    }
  }
}
