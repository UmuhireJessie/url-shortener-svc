import { Url } from "../database/models/url";
import { v4 as uuidv4 } from "uuid";

const BASE_SHORT_URL = process.env.BASE_SHORT_URL || "http://shorturl.com";

class URL {
  static async shortenUrl(req: any, res: any) {
    try {
      const { originalUrl } = req.body;

      // Validate the input
      if (!originalUrl) {
        return res.status(400).json({ message: "Original URL is required" });
      }

      let shortCode: any;
      let isUnique = false;

      // Ensure the short code is unique
      while (!isUnique) {
        shortCode = uuidv4().slice(0, 6);
        const existingUrl = await Url.findOne({ where: { shortCode } });
        if (!existingUrl) {
          isUnique = true;
        }
      }

      const shortUrl = `${BASE_SHORT_URL}/${shortCode}`;

      // Save the new URL entry
      const newUrl = await Url.create({
        originalUrl,
        shortCode,
      });

      return res.status(201).json({
        status: "success",
        shortUrl,
        data: newUrl,
      });
    } catch (error: any) {
      console.error("Error creating short URL:", error);
      return res.status(500).json({ status: "error", error: error.message });
    }
  }
  static async redirectUrl(req: any, res: any) {
    try {
      const { shortCode } = req.params;

      // Find the original URL by short code
      const urlEntry: any = await Url.findOne({ where: { shortCode } });
      if (!urlEntry) {
        return res
          .status(404)
          .json({ status: "fail", message: "URL not found" });
      }

      // Increment the click count
      urlEntry.clickCount += 1;
      await urlEntry.save();

      // Redirect to the original URL
      return res.redirect(urlEntry.originalUrl);
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
  static async getUrlStats(req: any, res: any) {
    try {
      const { code } = req.params;

      // Find the URL by its short code
      const urlEntry: any = await Url.findOne({ where: { shortCode: code } });
      if (!urlEntry) {
        return res
          .status(404)
          .json({ status: "fail", message: "URL not found" });
      }

      res.status(200).json({
        status: "success",
        data: urlEntry,
        shortUrl: `${BASE_SHORT_URL}/${urlEntry.shortCode}`,
      });
    } catch (error: any) {
      console.error("Error fetching URL stats:", error);
      res.status(500).json({ status: "error", error: error.message, });
    }
  }
}

export default URL;
