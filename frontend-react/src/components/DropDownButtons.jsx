function DropDownButton({name, value, openOption, fetchData, isSelected, setYear}) {

    var className = ""
    if (isSelected) {className = "bg-slate-500 text-gray-300 cursor-default"}
    else {className = "bg-blue-600 text-white cursor-pointer"}

    function selectOption() {
        if (!isSelected) {
            openOption(value)
            fetchData(value)
            setYear(1950)
        }
    }
    
    return (
        <button onClick={selectOption} disabled={isSelected}
        className={"block px-8 py-4 mx-8 my-4 bg-blue-600 " + className}>
            {name}
        </button>
    )
}

export default DropDownButton