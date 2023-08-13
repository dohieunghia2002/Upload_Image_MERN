import './modal.css';

const LoadingModal = (props) => {
    const { isLoading, setLoading } = props;
    console.log(isLoading);

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