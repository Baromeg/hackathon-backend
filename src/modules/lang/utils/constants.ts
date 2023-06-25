export const constructPrompt = (
  subject: string,
  context: string,
  level: string,
  method: string,
  scope: string = ""
) => `Provide a concise overview of key concepts in ${subject} ${
  scope != "" ? `within scope of ${scope}` : ""
} that make up approximately 20% of the field but would allow for an understanding of about 80% of it. 
Tailor the response to a ${context} context. 
The context for this information is to ${method} for ${level} audience. 
Provide a few examples of how these concepts apply in real-world contexts. 
Format: you will give as a response as JSON object. 
It will have 3 fields: coveringPoints, pointDetails, realWorld. 
In coveringPoints you should outline all points that will be covered in array of strings. 
In pointDetails you will create an object with key:value structure, key will be a point name, the value will be the text covering this point. 
In realWorld you will create an object with key:value structure, key will be an example of a real-world application title and the value will be the text explanation.

In all key:value pairs both key and value strings should be covered in ""(double-quote mark)`;

export const getAWikipidiaPageURL = (
  subject: string
) => `Find the latest Wikipidia page URL with information on this ${subject} topic. 
The return should be in JSON format.
If you was able to find a page you should return {"pageUrl": "<YOUR_PAGE_URL>"}.
If you wasn't able to find a page you should return {"pageURL":""}.
In all key:value pairs both key and value strings should be covered in ""(double-quote mark).`;
