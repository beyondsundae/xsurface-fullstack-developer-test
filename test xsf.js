const A1 = [ 
    { name: "Alex", tel: "0991112222", code: "xsf0001"},
    { name: "Jane", tel: "0812221234", code: "xsf0002"},
    { name: "Alex", tel: "0832214433", code: "xsf0001"},
    { name: "Alex", tel: "0991113122", code: "xsf0003"}
    ]
    // expected
    // [
    // { name: "Alex", tel: ["0991112222", "0832214433"], code: "xsf0001"},
    // { name: "Jane", tel: "0812221234", code: "xsf0002"},
    // { name: "Alex", tel: "0991113122", code: "xsf0003"}
    // ] 
         
    
    const function1 = (data) => {
        const Mapped = new Map()
        for (const each of data) {
            const getMapped = Mapped.get(each?.code)
            const thisMappedTel = getMapped?.tel
            const result = {
                ...each,
                tel: getMapped ? Array.isArray(thisMappedTel) ? [...thisMappedTel, each?.tel] : [thisMappedTel, each?.tel]: each?.tel
            }
            Mapped.set(each?.code, result)
        }
        return Array.from(Mapped?.values())
    }

    function1(A1)
   
    /* ------------------------------------ - ----------------------------------- */

    const A2 = { 
        customer: "Xsurface", 
        contact: [
        {name: "Max"},
        {name: "Mike"},
        {name: "Adam"}],
        address: "Sukhumvit 62",
          }
        // Output: [ { 
        // name: “Max”,
        // customer: "Xsurface", 
        // address: “Sukhumvit 62”,
        //      },{ 
        // name: “Mike”,
        // customer: "Xsurface", 
        // address: “Sukhumvit 62”,
        //       },{ 
        // name: “Adam”,
        // customer: "Xsurface", 
        // address: “Sukhumvit 62”,
        //   }] 

        const function2 = (data) => {
            const {contact, ...restData} = data || {}
            const result = (contact || [])?.map(({name}) => ({
                ...restData,
                name
            }))

            return result
        }

        function2(A2)

    /* ------------------------------------ - ----------------------------------- */

        const A3 =[
            { name: "A", age: "30"},
            { name: "B", age: "9"},
            { name: "C", age: "20"},
            { name: "D", age: "18"},
            { name: "E", age: "11"},
            { name: "F", age: "60"},
            { name: "G", age: "27"},
            { name: "H", age: "90"},
            { name: "I", age: "21"},
            { name: "J", age: "12"}
            ]
        // Output: [“B”, “J”, “D”, “I”, “G”, “A”]

        const function3 = (data, limit) => {
            const result = data?.filter(each => Number(each?.age) <= limit)?.sort((a, b) => Number(a.age) - Number(b.age))?.map(each => each?.name)
            return result
        }

        const C = function3(A3, 30)

    /* ------------------------------------ - ----------------------------------- */
    // Example:
    // This is A, It correctly outputs from question C.
    // This is B, It correctly outputs from question C.

    const expected = [
        'B', 'E', 'J',
        'D', 'C', 'I',
        'G', 'A'
      ]

    const function4 = (input, expected) => {
        const result = function3(input, 30)
        // This is B, It correctly outputs from question C.

        return (
            <ul>
                {result.map((each, index) => {
                const isCorrect = expected[index] === each;
                    return (
                        <li key={each}>
                            <span
                                style={{
                                color: "#38761d",
                                }}
                            >
                                This is{" "}
                                <span style={{ textDecoration: "underline" }}>{each}</span>,{" "}
                            </span>

                            <span
                                style={{
                                ...(isCorrect && {color: "#ffffff", backgroundColor: "#5b0f00"})
                                }}
                            >
                                {isCorrect
                                ? "It correctly outputs from question C."
                                : "It not correctly outputs from question C."}
                            </span>
                        </li>
                    )
                })}
            </ul>
        )
    }

    function4(A3, expected)

        
        