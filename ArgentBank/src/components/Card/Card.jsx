import style from './Card.module.css'


const Card = () => {
    return (
        <div className={style.card}>
            <div className={style.cardContent}>
                <p className={style.cardText}>Argent bank cheking x8Y77</p>
                <h2 className={style.cardTitle}>$ 2,234.876</h2>
                <p className={style.cardText}>available Balance</p>
            </div>
            <div className={style.cardButton}>
                <button className={style.viewButton}>
                    View transactions
                </button>
            </div>
        </div>
    )
}

export default Card
