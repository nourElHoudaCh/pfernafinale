import React, { useState } from 'react';
import {
  DataGridPro,
  gridColumnVisibilityModelSelector,
  GridEvents,
  useGridApiRef,
} from '@mui/x-data-grid-pro';
import './loc.css'

const INITIAL_GROUPING_COLUMN_MODEL = ['nompay', 'region'];

const empList = [
  { id: 1, ville: "Bizerte",nompay: "tunis", region: 'Nord-Est ', code:'0111'},
  { id: 2, ville: "tunis",nompay: "tunis", region: 'Nord-Est ' ,code:'0112'},
  { id: 3, ville: "ariena",nompay: "tunis", region: 'Nord-Est ', code:'0113' },
  { id: 4, ville: "La Manouba",nompay: "tunis", region: 'Nord-Est ', code:'0114'},
  { id: 5, ville: "Ben Arous ",nompay: "tunis", region: 'Nord-Est ', code:'0115'},
  { id: 6, ville: "Zaghouan",nompay: "tunis", region: 'Nord-Est ', code:'0116'},
  { id: 7, ville: "Nabeul",nompay: "tunis", region: 'Nord-Est ', code:'0117'},
  { id: 8,  ville: "Jendouba ",  nompay: "tunis", region: 'Nord-Ouest', code:'0121' },
  { id: 9,  ville: " Béja  ",  nompay: "tunis", region: 'Nord-Ouest' , code:'0122'},
  { id: 10,  ville: " Le Kef  ",  nompay: "tunis", region: 'Nord-Ouest', code:'0123' },
  { id: 11,  ville: " Siliana ",  nompay: "tunis", region: 'Nord-Ouest' , code:'0124'},
  { id: 12, ville: "Sousse ",  nompay: "tunis",region: 'Centre-Est', code:'0131'},
  { id: 13, ville: " Monastir ",  nompay: "tunis",region: 'Centre-Est', code:'0132'},
  { id: 14, ville: "Mahdia",  nompay: "tunis",region: 'Centre-Est', code:'0133'},
   { id: 15,  ville: "Kairouan ",  nompay: "tunis",region:'Centre-Ouest', code:'0141'},
   { id: 16,  ville: "Kasserine ",  nompay: "tunis",region:'Centre-Ouest', code:'0142'},
   { id: 17,  ville: "Sidi Bouzid ",  nompay: "tunis",region:'Centre-Ouest', code:'0143'},
  { id: 18,  ville: "Sfax ",  nompay: "tunis",region:'Sud-Est ' , code:'0151'},
  { id: 19,  ville: "Gabès",  nompay: "tunis",region:'Sud-Est ', code:'0152'},
  { id: 20,  ville: " Médenine",  nompay: "tunis",region:'Sud-Est ', code:'0153'},
  { id: 21,  ville: " Tataouine",  nompay: "tunis",region:'Sud-Est ', code:'0154'},
  { id: 22,  ville: "Gafsa", nompay: "tunis",region:'Sud-Ouest ', code:'01561'},
  { id: 23,  ville: "Tozeur", nompay: "tunis",region:'Sud-Ouest ',code:'01562'},
  { id: 24,  ville: "Kébili", nompay: "tunis",region:'Sud-Ouest ',code:'01563'},
]

const useKeepGroupingColumnsHidden = (apiRef, columns, initialModel, leafField) => {
  const prevModel = React.useRef(initialModel);

  React.useEffect(() => {
    apiRef.current.subscribeEvent(GridEvents.rowGroupingModelChange, (newModel) => {
      const columnVisibilityModel = {
        ...gridColumnVisibilityModelSelector(apiRef),
      };

      newModel.forEach((field) => {
        if (!prevModel.current.includes(field)) {
          columnVisibilityModel[field] = false;
        }
      });
      prevModel.current.forEach((field) => {
        if (!newModel.includes(field)) {
          columnVisibilityModel[field] = true;
        }
      });
      apiRef.current.setColumnVisibilityModel(columnVisibilityModel);
      prevModel.current = newModel;
    });
  }, [apiRef]);

  return React.useMemo(
    () =>
      columns.map((colDef) =>
        initialModel.includes(colDef.field) ||
        (leafField && colDef.field === leafField)
          ? { ...colDef, hide: true }
          : colDef,
      ),
    [columns, initialModel, leafField],
  );
};

export default function Loc() {
  const columnss = [
  
    { title: "nompay", field: "nompay" ,defaultGroupOrder:1},  
  
    { title: "region", field: 'region'},
    {title:"code",field:"code"},
    {title:"ville",field:"ville"},
   
  ]

  ;
  const [data, setData] = useState(empList);
  const apiRef = useGridApiRef();

  const columns = useKeepGroupingColumnsHidden(
    apiRef,
    columnss,
    INITIAL_GROUPING_COLUMN_MODEL,
  );

  return (
    <>
    
    <br></br>
    <br></br>
    <h1 className='titreloc'> localisation</h1>
    <div style={{ height: 400, width: 900, background:'white' }} className='tableloc'>
      <DataGridPro
         rows={data}
         apiRef={apiRef}
         columns={columns}
        rowGroupingColumnMode="multiple"
        initialState={{
          rowGrouping: {
            model: INITIAL_GROUPING_COLUMN_MODEL,
          },
        }}
        experimentalFeatures={{
          rowGrouping: true,
        }}
      />
    </div></>
  );
}