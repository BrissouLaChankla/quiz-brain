
export default async function page() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/scores`, { cache: 'no-store' });
    const { scores } = await res.json()

    return (
        <div className="grow flex flex-col gap-10 items-center mt-10 lg:mt-0 lg:justify-center max-w-screen-lg w-full m-auto px-4">
            <h1 className="lg:-mt-14 text-center">
                Voici la crème de la <span className="outlined">crème</span>
            </h1>
            <div className="overflow-x-auto w-full border-primary border-[3px] rounded-xl h-96 relative  ">
                <table className="table table-pin-rows table-pin-cols ">
                    <thead className="border-b-[3px] border-primary text-primary text-lg">
                        <tr>
                            <th>Pseudo</th>
                            <th>Score</th>
                            <th>Catégorie</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    {
                        !!scores.length ?
                            scores.map((player, i) => {
                                return (
                                    <tbody >
                                        <tr key={player._id} className={`font-medium ${i % 2 === 0 ? "bg-primary/10" : ""}`}>
                                            <td>{player.pseudo}</td>
                                            <td>{player.score}</td>
                                            <td>{player.category}</td>
                                            <td>{new Date(player.createdAt).toLocaleDateString('en-GB')}</td>
                                        </tr>
                                    </tbody>
                                )
                            })
                            :
                            <span className="loading loading-spinner text-primary loading-md absolute left-1/2 top-48"></span>
                    }

                </table>
            </div>
        </div>
    )
}

