import './elements.css';
import nodeImg from './assets/message-node.png';
export default function Elements(){
    const elementsData = [{id:1,type:'messageNode',name:'Message',src:nodeImg}];
    const onDragStarted = (event,nodeType)=>{
        event.dataTransfer.setData('chatflow/element',nodeType);
        event.dataTransfer.effectAllowed = 'move';
    }
    return (<div className="elements-panel">{
        elementsData.map((e,i)=>
        <img  name={e.type} key={e.type} draggable 
        onDragStart={(event)=>onDragStarted(event,e.type)} className='element' src={e.src} alt={`${e.name} node type`} />)
        }</div>);
}