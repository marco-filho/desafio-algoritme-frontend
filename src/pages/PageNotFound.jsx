import React from 'react';

function PageNotFound() {
    return (
        <main>
            <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 24 }}>{window.location.href} não encontrado.</p>
            </div>
        </main>
    )
}

export default PageNotFound