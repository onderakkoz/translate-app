import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//* asenkron thunk aksiyonu
export const getLanguages = createAsyncThunk(
  "languages/getLanguages",
  async () => {
    //*api istegi atilir
    const res = await api.get("/getLanguages");
    // console.log(res);

    //payloada return etme
    return res.data.data.languages;
  }
);

export const translateText = createAsyncThunk("/translate", async (p) => {
  // console.log(p);

  // api'ye gonderilecek olan parametreleri belirleme
  const params = new URLSearchParams();
  params.set("source_language", p.sourceLang.value);
  params.set("target_language", p.targetLang.value);
  params.set("text", p.text);

  // ceviri verilerini almak icin apiye post istegi atma
  const res = await api.post("/translate", params);
  console.log(res);

  //payloada return etme
  return res.data.data;
});
