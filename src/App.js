import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const start = 20;
const ten = 100*start;
const itemH = 200;

function App() {
    const [max, setMax] = useState(start);
    const ref = useRef(null);
    const items = useMemo(() => [...Array(max).keys()], [max]);
    const percentage = useMemo(() => ((ten - (ten - max)) / ten), [max]);
    const style = useMemo(() => ({
        backgroundColor: '#33ab5f',
        opacity: percentage
    }), [percentage]);

    useEffect(() => {
        const onScroll = () => {
            let d = document.documentElement;
            let offset = d.scrollTop + window.innerHeight;
            let height = d.offsetHeight;

            if (offset >= height) {
                setMax(prev => prev + 8);
            }
        }

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [max]);

    return (
        <>
            <span className="percentage">{Math.round(percentage * 10000) / 100} %</span>
            <div className="App" ref={ref} style={style}>
                {items.map((item, key) => <Item key={key} item={item} />)}
            </div>
        </>
    );
}

function Item() {
    return <div style={{ height: `${itemH}px`, outline: '1px solid red' }} />;
}

export default App;
