import crypto from "crypto";

class SpendilowTransaction {
  public id: string;
  public user_id: string;
  public amount: number;
  public transaction_date: Date;
  public title: string;
  public notes: string;
  public tags: string;
  public transaction_type: string;
  public target_id: string;

  constructor({
    id,
    user_id,
    amount,
    transaction_date,
    title,
    notes,
    tags,
    transaction_type,
    target_id,
  }: SpendilowTransaction) {
    this.id = id;
    this.user_id = user_id;
    this.amount = amount;
    this.transaction_date = transaction_date;
    this.title = title;
    this.notes = notes;
    this.tags = tags;
    this.transaction_type = transaction_type;
    this.target_id = target_id;
  }

  idGeneration(): string {
    return crypto.randomUUID();
  }
}

module.exports = SpendilowTransaction;
