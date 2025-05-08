import React from 'react'

const SectionEight = () => {
  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='lg:flex-row flex flex-col justify-center items-center gap-10 lg:gap-24'>
        <div className='lg:w-2/5 w-full bg-white rounded-xl shadow-lg p-8 lg:p-12'>
          <h1 className='lg:text-4xl text-2xl font-bold text-center mb-6'>Pourquoi vous devriez nous choisir ?</h1>
          <p className='lg:text-xl text-sm text-justify leading-relaxed'>
            Nous vous accompagnons dans votre transformation digitale avec des solutions sur mesure,
            innovantes et performantes. Notre expertise vous garantit des outils adaptés à vos besoins pour optimiser
            votre activité. Faites le choix d&apos;un partenaire engagé pour votre succès.
          </p>
        </div>
        <div className='lg:w-3/5 w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
          {/* Carte 1 */}
          <div className='w-full h-56 bg-green-700 text-center flex flex-col justify-center items-center rounded-xl'>
            <h1 className="text-2xl text-stone-100 font-bold">+20</h1>
            <h2 className="text-lg text-stone-100 font-semibold mt-1">Branding réalisés</h2>
          </div>

          {/* Carte 2 */}
          <div className='w-full h-56 p-4 border-4 border-dashed text-center flex flex-col justify-center items-center rounded-xl'>
            <h1 className="text-2xl font-bold">+20</h1>
            <h2 className="text-sm font-semibold mt-1">Systèmes automatisés</h2>
          </div>

          {/* Carte 3 */}
          <div className='w-full h-56 p-4 bg-green-700 text-center flex flex-col justify-center items-center rounded-xl'>
            <h1 className="text-2xl text-stone-100 font-bold">+20</h1>
            <h2 className="text-lg text-stone-100 font-semibold mt-1">Applications vendues</h2>
          </div>

          {/* Carte 4 */}
          <div className='w-full h-56 p-4 border-4 border-dashed text-center flex flex-col justify-center items-center rounded-xl'>
            <h1 className="text-2xl font-bold">+20</h1>
            <h2 className="text-sm font-semibold mt-1">Entreprises clientes</h2>
          </div>

          {/* Carte 5 */}
          <div className='w-full h-56 bg-green-700 p-4 text-center flex flex-col justify-center items-center rounded-xl'>
            <h1 className="text-2xl text-stone-100 font-bold">+20</h1>
            <h2 className="text-lg text-stone-100 font-semibold mt-1">Applications vendues</h2>
          </div>

          {/* Carte 6 */}
          <div className='w-full h-56 p-4 border-4 border-dashed text-center flex flex-col justify-center items-center rounded-xl'>
            <h1 className="text-2xl font-bold">+20</h1>
            <h2 className="text-sm font-semibold mt-1">Entreprises clientes</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionEight