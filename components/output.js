export default function Output(props) {
    const { idkValue } = props

    return (
        <>
            <div className="outputContainer">
                <p className="outputText">{idkValue}</p>
            </div>
            <style jsx>{`
            .outputContainer {
                width: 100%;
                text-align: center;
            }
            .outputText {
                font-size: 36px;
            }
            `}</style>
        </>
    )
}