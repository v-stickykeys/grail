'use client';

import { useEffect, useState } from "react";
import "./styles.css";
import { useInterval } from "@/utils/useInterval";

interface FlipCounterProps {
  start: number,
  end: number,
};

export default function FlipCounter({ start, end }: FlipCounterProps) {
  const [current, setCurrent] = useState(start + 1);
  const [change, setChange] = useState(true);

  useInterval(tick, 100);
  function tick() {
    if (current < end) {
      setCurrent(current + 1);
      setChange(!change);
  }
    }
	
		return(
			<div className={'flipCounter'}>
				<div className={'upperCard'}>
					<span>{current}</span>
				</div>
				<div className={'lowerCard'}>
					<span>{current - 1}</span>
				</div>
				<div className={`flipCard first ${change ? 'fold': 'unfold'}`}>
					<span>{change ? current - 1 : current}</span>
				</div>
				<div className={`flipCard second ${!change ? 'fold': 'unfold'}`}>
					<span>{!change ? current - 1 : current}</span>
				</div>
			</div>
		);
}
