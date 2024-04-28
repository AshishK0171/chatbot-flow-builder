export default function Editor({selectedNodeData=[],onDataChanged}){
    const onChange = (e,nodeData)=>{
        onDataChanged(e.target.value,nodeData);
    }
    return(<>
    <div className="element-header">
    <p >Message</p>
    </div>
    <hr />
    <div className="element-editor">
    <label htmlFor="textEditor" style={{display:'block'}}>Text</label>
    <textarea onChange={(e)=>onChange(e,selectedNodeData[0])} name="text" id="textEditor" cols="30" rows="10" value={selectedNodeData[0]?.data?.label}>
        </textarea>
    </div>
    <hr />
        </>);
}