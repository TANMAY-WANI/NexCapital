'use server'

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";


const {
    APPWRITE_DATABASE_ID: Database_ID,
    APPWRITE_USER_COLLECTION_ID: User_collection_ID,
    APPWRITE_BANK_COLLECTION_ID: Bank_collection_ID,
    APPWRITE_TRANSACTION_COLLECTION_ID:Transaction_collection_ID


} = process.env;


export const createTransaction = async (transaction:CreateTransactionProps)=>{
    try {
        const {databases} = await createAdminClient()

        const newTransaction = await databases.createDocument(
            Database_ID!,
            Transaction_collection_ID!,
            ID.unique(),
            {
                channel:'online',
                category:'transfer',
                ...transaction
            }
        )

        return parseStringify(newTransaction)
    } catch (error) {
        console.log(error);
        
    }
}

export const getTransactionsByBankId = async ({bankId}:getTransactionsByBankIdProps)=>{
    try {
        const {databases} = await createAdminClient()

        const senderTransactions = await databases.listDocuments(
            Database_ID!,
            Transaction_collection_ID!,
            [Query.equal('senderBankId',bankId)]
        )
        const receiverTransactions = await databases.listDocuments(
            Database_ID!,
            Transaction_collection_ID!,
            [Query.equal('receiverBankId',bankId)]
        )
        const transactions = {
            total: senderTransactions.total + receiverTransactions.total,
            documents: [
                ...senderTransactions.documents,
                ...receiverTransactions.documents
            ]
        }
        return parseStringify(transactions)
    } catch (error) {
        console.log(error);
        
    }
}