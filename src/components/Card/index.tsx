import { Article } from "@/app/page";
import Link from "next/link";

type CardProps = { article: Article };

const Card = ({ article }: CardProps) => (
  <Link href={`/article/${article.slug}`}>
    <div className="card  h-full  bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{article.title}</h2>
        <p>{article.description}</p>
        <div className="divider" />
        <div className="card-actions ">
          {" "}
          {article.tagList.map((tag: string) => (
            <div className="badge badge-outline" key={tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  </Link>
);

export default Card;
