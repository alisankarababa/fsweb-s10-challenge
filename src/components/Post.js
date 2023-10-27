import React from "react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

import { useDispatch } from "react-redux";
import { notSilAPI } from "../actions"
import { toast } from "react-toastify";


export default function Post({ item }) {

    const dispatch = useDispatch();



  function handleSil() {
      
    const toastId = toast.loading("Notunuz siliniyor...", 
    {
        closeOnClick: true,
          theme: "light"
    });

    function resultNotSil(isSuccessfull) {
        if(isSuccessfull) {
            toast.update(toastId, 
                {
                    render: "Notunuz silindi",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                    pauseOnHover: false
                });
            } else {
            
                toast.update(toastId,
                {
                    render: "Not silme başarısız",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                    pauseOnHover: false
                });
            }
    }

    dispatch(notSilAPI(item.id, resultNotSil));
}

  return (
    <div className="beyazKutu p-8 pb-6 mb-4 text-sm">
      <h1>
        {formatDistanceToNow(new Date(item.date), {
          addSuffix: true,
          locale: tr,
        })}
      </h1>

      {item.body.split("|").map((li) => (
        <p className="mt-2" key={li}>
          - {li}
        </p>
      ))}

      <button className="text-xs text-amber-600 mt-4 underline" onClick={handleSil}>
        Bu notu sil
      </button>
    </div>
  );
}
