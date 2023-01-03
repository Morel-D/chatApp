const Groups = () => {

    const rooms = ['Football Group', 'Tech Community', 'Otaku Guild' ]

    return ( 
        <div className="groups"> 
            


            {   
                rooms.map((room) => (

                <div className="shadow-sm bg-body p-3 m-2" key={room.id}>
                 <label className="text-secondary">{room}</label>        
                </div>

                ))
            }

        </div> 
     );
}
 
export default Groups;