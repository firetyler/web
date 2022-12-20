import { Injectable } from '@angular/core';
import axios from "axios";
import cheerio from "cheerio";




@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private kronoxURL = 'http://schema.hig.se/lokaler.jsp';
  private axiosInstance = axios.create();
  constructor() { }

  async getRoomsService() {
    await axios.get(this.kronoxURL)
      .then((response) => {
        const html = response.data;
        console.log(html)
        const $ = cheerio.load(html);
        const nummer = $("#resultdiv");
        console.log(nummer);
      });
  }
}
