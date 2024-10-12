import axios from "axios";
import { CANDIDATE_ID } from "../constants/candidate";

// TODO: add a retry for fails or do something with them. maybe store them somewhere to be dealt with later


export const SOLOON_COLORS = [ 'blue', 'red', 'purple', 'white'] as const;
export type SoloonColors = typeof SOLOON_COLORS[number];

export const COMETH_DIRECTIONS = ['up', 'down', 'left', 'right'] as const;
export type ComethDirections = typeof COMETH_DIRECTIONS[number];

export class MegaverseService {
  readonly endpoint = 'https://challenge.crossmint.io/api';

  logError(e: unknown, row?: number, column?: number) {
    const error = e as any;
    const status = error.status || 'unknown status';
    const message = error.message || 'unknonwn error';

    console.error('postPolyanets error', {
      status,
      message,
      data: { row, column },
    });
  }

  async postPolyanets(row: number, column: number) {
    try {
      const postData = await axios({
        url: this.endpoint + `/polyanets`,
        method: 'POST',
        data: { row, column, candidateId: CANDIDATE_ID }
      });
  
      return postData;
    } catch (e) {
      this.logError(e, row, column);

      return null;
    }
  }

  async deletePolyanets(row: number, column: number) {
    try {
      const deleteData = await axios({
        url: this.endpoint + `/polyanets`,
        method: 'DELETE',
        data: { row, column, candidateId: CANDIDATE_ID }
      });
  
      return deleteData;
    } catch (e) {
      this.logError(e, row, column);

      return null;
    }
  }

  async postSoloon(row: number, column: number, color: SoloonColors) {
    try {
      const postData = await axios({
        url: this.endpoint + `/soloons`,
        method: 'POST',
        data: { row, column, color, candidateId: CANDIDATE_ID }
      });
  
      return postData;
    } catch (e) {
      this.logError(e, row, column);

      return null;
    }
  }

  async deleteSoloon(row: number, column: number) {
    try {
      const deleteData = await axios({
        url: this.endpoint + `/soloons`,
        method: 'DELETE',
        data: { row, column, candidateId: CANDIDATE_ID }
      });
  
      return deleteData;
    } catch (e) {
      this.logError(e, row, column);

      return null;
    }
  }

  async postCometh(row: number, column: number, direction: ComethDirections) {
    try {
      const postData = await axios({
        url: this.endpoint + `/comeths`,
        method: 'POST',
        data: { row, column, direction, candidateId: CANDIDATE_ID }
      });
  
      return postData;
    } catch (e) {
      this.logError(e, row, column);

      return null;
    }
  }

  async deleteCometh(row: number, column: number) {
    try {
      const deleteData = await axios({
        url: this.endpoint + `/comeths`,
        method: 'DELETE',
        data: { row, column, candidateId: CANDIDATE_ID }
      });
  
      return deleteData;
    } catch (e) {
      this.logError(e, row, column);

      return null;
    }
  }

  async getMap() {
    try {
      const mapData = await axios.get(this.endpoint + `/map/${CANDIDATE_ID}/goal`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return mapData.data;
    } catch (e) {
      this.logError(e);
    }
  }
}
