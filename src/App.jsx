import Select from "react-select";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { getLanguages, translateText } from "./redux/actions";
import { cleareAnswer } from "./redux/slice/translateSlice";

function App() {
  const dispatch = useDispatch();

  const { isLoading, isError, languages } = useSelector(
    (store) => store.languageReducer
  );
  // console.log(languages);
  // console.log(isError);
  // console.log(isLoading);

  const translateState = useSelector((store) => store.translateReducer);
  console.log(translateState);

  const areaRef = useRef();

  //selectlerin baslangic degerlerini verdik
  const [sourceLang, setSourceLang] = useState({
    label: "English",
    value: "en",
  });
  const [targetLang, setTargetLang] = useState({
    label: "Turkish",
    value: "tr",
  });

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  /**
   * Dil dizisini bizden istenen formata cevirmek icin map ile donduk
   * dizinin icindeki herbir elemanin code ve name degerlerini value ve label degerlerine cevirdik
   * languages dizisi değişmediğinde, useMemo önceki hesaplanan değeri döndürür.
   * Bu sayede gereksiz hesaplamalar ve render'lar önlenmiş olur..
   */
  const formatted = useMemo(
    () =>
      languages.map((i) => ({
        label: i.name,
        value: i.code,
      })),
    [languages]
  );
  // console.log(formatted);

  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  // select alanlarindaki verilerin yerlerini degistirme
  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    //state'i temizler ve disable text areayi temizler
    dispatch(cleareAnswer());

    //ilk text area'yi temizler
    // console.log(areaRef.current.value);
    areaRef.current.value = "";
  };

  return (
    <>
      <div className="bg-zinc-900 h-screen text-white grid place-items-center">
        <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
          <div className="flex items-center justify-center">
            <img className="size-20 bg-white rounded-[50%]" src="./public/language.webp" />
            <h1 className="mb-7 text-4xl font-semibold flex justify-center align-items-center gap-3">
            Translate
            </h1>
          </div>
          {/**ust kisim */}
          <div className="flex align-items-center gap-3 text-black font-bold mt-4">
            <Select
              onChange={(e) => setSourceLang(e)}
              value={sourceLang}
              options={formatted}
              className="flex-1"
            />
            <button
              onClick={handleSwap}
              className="text-white bg-zinc-700 px-6 rounded hover:ring-2 hover:bg-zinc-800 text-2xl"
            >
              <FaArrowRightArrowLeft />
            </button>
            <Select
              onChange={(e) => setTargetLang(e)}
              value={targetLang}
              options={formatted}
              className="flex-1"
            />
          </div>

          {/**Text alanlari  */}
          <div className="flex mt-5 gap-3 md:gap-[105px] max-md:flex-col">
            <div className="flex-1">
              <textarea
                ref={areaRef}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[300px] max-h-[500px] text-black p-[10px] text-[20px] rounded"
              ></textarea>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={translateState.answer}
                disabled
                className="text-gray-200 w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded"
              ></textarea>

              {translateState.isLoading && (
                <div className="loader absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleTranslate}
            className="bg-zinc-700 mt-3 py-3 px-5 rounded hover:ring-2 hover:bg-zinc-800 text-[17px] font-semibold"
          >
            Translate
          </button>
        </div>
        
        <h1 className="underline">designed by <span className=" text-red-700 text-lg font-bold">Önder AKKKÖZ</span></h1>

      </div>
    </>
  );
}

export default App;