import nextId from "react-id-generator";
import { useAppDispatch } from "../../redux/hooks";
import {
  setBudgetMenuModalSliceBudgetId,
  setBudgetMenuModalSliceShowing,
} from "../../redux/reducers/interactions/budgetMenuModalSlice";
import { deleteSpendilowUserBudget } from "../../services/authenticated-users/budgets/auth-usr-budgets-external-calls";
import { SpendilowBudget } from "../../shared/interfaces";

interface BudgetDisplayerProps {
  userBudgets: SpendilowBudget[];
}

export default function BudgetDisplayerComponent({
  userBudgets,
}: BudgetDisplayerProps) {
  // ------ HOOKS ------
  const dispatch = useAppDispatch();

  const budgetMenuCreator = (budgetId?: string) => {
    return (
      <ul className="menu menu-horizontal rounded-box bg-accent">
        <li className="tablet:table-cell">
          <button
            onClick={() => {
              dispatch(setBudgetMenuModalSliceShowing(true));
              dispatch(setBudgetMenuModalSliceBudgetId(budgetId));
            }}
          >
            <a>
              <svg
                className="w-5 h-5 text-neutral dark:text-neutral"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </button>
        </li>
        <li className="hidden tablet:table-cell">
          <button
            onClick={() => {
              deleteBudget(budgetId);
            }}
          >
            <svg
              className="w-5 h-5 text-neutral dark:text-neutral"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    );
  };

  // ------ FUNCTIONS ------
  async function deleteBudget(budgetId?: string) {
    const response = confirm("Vuoi eliminare questo budget?");

    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const externalCallResult: any = await deleteSpendilowUserBudget(
        budgetId!
      );

      if (externalCallResult.success) {
        window.location.href =
          import.meta.env.VITE_BASENAME + "/user/dashboard";
      } else {
        alert(externalCallResult);
      }
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="font-primary text-neutral">
            <tr className="border-accent">
              <th>Nome</th>
              <th>Totale</th>
              <th className="hidden tablet:table-cell">Descrizione</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userBudgets.map((budget: SpendilowBudget) => {
              return (
                <tr key={nextId()} className="font-body">
                  <td>{budget.name}</td>
                  {/* <td className="font-bold">{budget.amount}</td> */}
                  <td>0.0</td>
                  <td className="hidden tablet:table-cell ">
                    {budget.description}
                  </td>
                  <td className="text-right tablet:table-cell ">
                    {budgetMenuCreator(budget?.id)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
