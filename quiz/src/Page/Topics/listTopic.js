import { useEffect, useState } from "react";
import Modal from 'react-modal'
import { getTopic } from "../../Services/Topics";
import { Link, useNavigate } from "react-router-dom";
import "./Topic.scss"


Modal.setAppElement("#root");

function ListTopic() {

    const [showModal, setShowModal] = useState(false);
    const [topics, setTopics] = useState([]);
    const [item, setItem] = useState(null);
    const nagivate = useNavigate();
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
        },
    };

    const openModal = (item) => {
        setItem(item);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }


    useEffect(() => {
        const fetchApi = async () => {
            const reult = await getTopic();
            setTopics(reult);
        }
        fetchApi();
    }, [])

    const slugify = (str) =>
        str.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

    const handleClick = (item) => {
        nagivate(`/question/${slugify(item.name)}?id=${item.id}`);
        closeModal();
    }
    return (
        <>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modal__content">
                <div className="modal__title">Bài tập về chủ đề: {item?.name}</div>
                <span>Xác nhận làm bài tập về chủ đề {item?.name} gồm 10 câu hỏi? Xác nhận làm bài.</span>
                <hr/>
                </div>
                <div className="modal__button">
                <button onClick={closeModal} className="modal__close">Hủy</button>
                <button onClick={() => handleClick(item)} className="modal__ok">Làm</button>
                </div>
            </Modal>
            <div className="topic__list">
                {topics.map(item => (
                    <div className="topic__item" key={item.id}>
                        {/* <Link to={`/${slugify(item.name)}?id=${item.id}`}>{item.name}</Link> */}
                        <Link onClick={() => openModal(item)}>{item.name}</Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ListTopic;