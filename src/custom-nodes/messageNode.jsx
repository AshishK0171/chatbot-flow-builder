import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import CustomHandle from '../custom-handle/customHandle';
 
export default function MessageNode({data}) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className="text-updater-node" >
      <Handle type="target" position={Position.Left} />
      <div>
        <div className="node-header">
        <i className="fa-regular fa-comment-dots"></i>
        <label htmlFor="text">Send Message</label>
        <p className='indicator'></p>
        </div>
        <p id="text" name="text" onChange={onChange}>{data?.label || 'text message'}</p>
      </div>
      <Handle type="source" position={Position.Right}/>
    </div>
  );
}