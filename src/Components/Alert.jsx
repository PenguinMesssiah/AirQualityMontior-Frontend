import { useState, useEffect, useCallback } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

function Alert({ message, variant = 'danger', dismissible = true, autoDismiss = true, onClose }) {
    const [show, setShow] = useState(true);

    const handleClose = useCallback(() => {
        setShow(false);
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (autoDismiss && show) {
            const timer = setTimeout(() => {
                handleClose();
            }, 8000); // Auto-dismiss after 8 seconds

            return () => clearTimeout(timer);
        }
    }, [autoDismiss, show, handleClose]);

    if (!show) return null;

    return (
        <BootstrapAlert
            variant={variant}
            dismissible={dismissible}
            onClose={handleClose}
            className="mt-3 mb-3"
        >
            {message}
        </BootstrapAlert>
    );
}

export default Alert;
