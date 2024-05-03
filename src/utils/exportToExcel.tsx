// import * as Filesaver from "file-saver"
// import  XLSX from "sheetjs-style"

export default function ExportToExcel(props:any) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    
    // const exportToxls = async () => {
    //     const ws = XLSX.utils.json_to_sheet(props.excelData);
    //     const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }; 
    //     const excelbuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //     const data = new Blob([excelbuffer], { type: fileType });
    //     Filesaver.saveAs(data, props.fileName + fileExtension);
    // }

    return(
        <>  
            {/* <button
                className="px-3 d-flex align-items-center justify-content-center rounded-1 w-100"
                style={{
                    outline: 'none',
                    background: '#007DA3',
                    color: '#ffffff',
                    border: '1px solid #62789D',
                    fontSize: '15px',
                    height: '50px',
                    cursor: 'pointer',
                }}
                onClick={exportToxls}
                >
                Export
            </button> */}

        </>
    )
}