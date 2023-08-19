import { createPortal } from "react-dom";
import { FC, ReactNode, useEffect, useRef } from "react";

interface IPortal {
	children: ReactNode;
}

const Portal: FC<IPortal> = ({ children }) => {
	const portalDiv = useRef<Element | null>(null);

	useEffect(() => {
		portalDiv.current = document.getElementById("portal");
	}, []);

	return portalDiv.current ? createPortal(children, portalDiv.current) : null;
};

export default Portal;
