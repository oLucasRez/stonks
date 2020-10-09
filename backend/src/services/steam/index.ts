import axios, { AxiosInstance } from 'axios';

class SteamAPI {
  private static instance : AxiosInstance;

  public static getInstance(): AxiosInstance {
    if(!this.instance){
      this.createAxiosInstance();
    }

    return this.instance;
  }

  private static createAxiosInstance() : void {
    this.instance = axios.create({
      baseURL: 'https://store.steampowered.com/api/'
    });
  }
}

export default SteamAPI;