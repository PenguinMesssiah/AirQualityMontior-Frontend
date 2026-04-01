import { communityVoices } from '@/text/communityVoices'

function CommunityVoices() {
  return (
    <div>
      {communityVoices.map((block, i) => (
        <div key={i} className='order-start bg-white pr-1 pl-1 border-1 border-primary rounded-md mb-3'>
          <p className="flex font-semibold text-2xl underline">{block.section}</p>
          <p className="flex font-normal">{block.intro}</p>
          {block.quotes.map((quote, j) => (
            <blockquote key={j} className="italic ps-4 ms-3">"{quote}"</blockquote>
          ))}
        </div>
      ))}
    </div>
  )
}

export default CommunityVoices;