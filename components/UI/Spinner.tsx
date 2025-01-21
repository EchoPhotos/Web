import './Spinner.css';

export function HStack({ children, className = '' }) {
  return <div className={`flex flex-row ${className}`}>{children}</div>;
}
export default function Spinner({ className = '' }) {
  return (
    <div className={`flex h-full w-full items-center justify-center ${className}`}>
      <div className="spinner">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
        <div className="bar10"></div>
        <div className="bar11"></div>
        <div className="bar12"></div>
      </div>
    </div>
  );
}
