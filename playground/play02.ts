const target = {} as any

target._befores || (target._befores = [])
target._befores.push('hello')
target._befores || (target._befores = [])

console.log(target._befores[0])