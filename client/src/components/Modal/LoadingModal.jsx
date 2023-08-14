import './modal.css';

const LoadingModal = (props) => {
    const { isLoading } = props;

    return (
        <div style={{ display: isLoading ? 'flex' : 'none' }} className='modal'>
            <div className='modal-content'>
                <div className='loader'></div>
                <div className='modal-text'>Loading...</div>
            </div>
        </div>
    );
}

export default LoadingModal;