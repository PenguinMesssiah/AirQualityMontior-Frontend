import { useEffect, useState } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

function OverviewCard({ deviceCount, lastReading, serverStatus }) {
    const [statusVariant, setStatusVariant] = useState('secondary');
    const [statusText, setStatusText] = useState('Unknown');

    useEffect(() => {
        // Determine server status badge variant and text
        if (serverStatus === 'online' || serverStatus === 'connected') {
            setStatusVariant('success');
            setStatusText('Online');
        } else if (serverStatus === 'offline' || serverStatus === 'disconnected') {
            setStatusVariant('danger');
            setStatusText('Offline');
        } else if (serverStatus === 'degraded' || serverStatus === 'warning') {
            setStatusVariant('warning');
            setStatusText('Degraded');
        } else {
            setStatusVariant('secondary');
            setStatusText('Unknown');
        }
    }, [serverStatus]);

    const formatLastReading = (timestamp) => {
        if (!timestamp) return 'No data available';

        try {
            const date = new Date(timestamp);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
            if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
            if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    return (
        <Card className="mb-4 shadow-sm border-secondary ">
            <Card.Header className="bg-primary text-white" style={{borderRadius: '15px'}}>
                <h5 className="mb-0">System Overview</h5>
            </Card.Header>
            <Card.Body>
                <Row className="text-center" >
                    <Col md={4} className="mb-3 mb-md-0">
                        <Card.Text className="text-muted small mb-2">
                            DEVICES DEPLOYED
                        </Card.Text>
                        <h2 className="display-4 fw-bold text-primary mb-0">
                            {deviceCount !== null && deviceCount !== undefined ? deviceCount : '—'}
                        </h2>
                    </Col>
                    <Col md={4} className="mb-3 mb-md-0 d-flex flex-column justify-content-center">
                        <Card.Text className="text-muted small mb-2">
                            LAST READING
                        </Card.Text>
                        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60px' }}>
                            <h5 className="fw-semibold text-dark mb-0">
                                {formatLastReading(lastReading)}
                            </h5>
                        </div>
                    </Col>
                    <Col md={4} className="d-flex flex-column justify-content-center">
                        <Card.Text className="text-muted small mb-2">
                            SERVER STATUS
                        </Card.Text>
                        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60px' }}>
                            <Badge bg={statusVariant} className="fs-6">
                                {statusText}
                            </Badge>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default OverviewCard;
