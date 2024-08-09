import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from "../../../firebase/config";
import './index.css'

const DataStoreList = () => {

  const [lista, setLista] = useState([])

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'dataStoreWaste'));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
  
    getLista();
  }, []);
  return (
        <div className='DataStoreWasteDiv'>
          {
            lista.map(list => (
              <div className={`DataWasteDiv ${list.container} ${list.status} `} key={list.id}>
                <p>{list.code}</p>
                <p>{list.container}</p>
                <p>{list.weight}</p>
              </div>
            ))
          }
        </div>
  );
};

export default DataStoreList;
