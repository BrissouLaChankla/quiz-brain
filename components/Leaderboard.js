export default async function Leaderboard() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/scores`, { cache: 'no-store' });
    const { scores } = await res.json();
    return (
        <>
            {scores.map((player, i) => {
                return (
                    <tr key={player._id} className={`font-medium ${i % 2 === 0 ? "bg-primary/10" : ""}`}>
                        <td>{player.pseudo}</td>
                        <td>{player.score}</td>
                        <td>{player.category}</td>
                        <td>{new Date(player.createdAt).toLocaleDateString('en-GB')}</td>
                    </tr>
                )
            })}
        </>
    )
}
