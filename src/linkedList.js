// Question 1: Implement a Linked List

class Node {
    constructor(data = null) {
        this.data = data
        this.next = null

    }
}

class LinkedList {
    //When constructing a linked list, the very first node you pass into the constructor will be the head by default.
    constructor(node = null) {
        this.head = node

    }

    //these class methods allow us to add more nodes behind the head node
    appendToTail(data) {
        // add new Node with data to tail
        let newNode = new Node(data)

        //traversing to find the tail means finding the node whose next property is null (doesn't point to anything more down the chain)

        //reassigning current variable to the next node and the next until we hit the tail, using while()
        let curr = this.head

        if (curr) {
            while (curr.next !== null) {
                //reassigning the current node to the next node (next points to the next node)
                curr = curr.next
            }

            curr.next === null ? curr.next = newNode : console.log('nope')
        } else {
            this.head = newNode
        }

    }

    prependToHead(data) {
        // add new Node with data to head (making it the new head of the linked list)
        //passing in data argument into the newNode, which helps it
        let newNode = new Node(data)

        //We can't just reassign the head to be a new node without any references to the rest of the list 
        // this.head = newNode



        //so we have to reassign the newNode's next property, but only IF there is no head node. why? When we have a constructor? idfk

        //if there 
        if (!this.head) {
            this.head = newNode
        } else if (this.head) {
            //making the newnode point to the head node, no longer making this.head the head node
            newNode.next = this.head

            //Why make sure that this.head is equal to newNode? This step ensures newNode will become the new head of the linked list
            this.head = newNode
        }
    }

    removeHead() {
        // remove the first Node in the LinkedList and returns its data
        //defining our 
        //storing the prev head in a variable
        let previous = this.head
        //redefining the class' head property to the node next in line to the current head
        this.head = this.head.next

        //returning the previous (now deleted) head's data 
        return previous.data
    }

    contains(data) {
        // returns true if any Node in the LinkedList contains the value data, false otherwise

        //grabbing the linked list by the head like a small child 
        //got this right
        let current = this.head


        while (current) {
            //did not have to do this:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
            // let next = current.next
            // let freq = new Set([current.data])

            //you're checking if the current node is equal to data, not creating a set bc you aren't counting the amount of times data pops up
            if (current.data === data) return true

            //if not, then move on to the next node and check its data 
            current = current.next

        }
        //if nothing returns true, return false. 
        return false
    }






    length() {
        //I did NAWTTT look at the github ok (flex!!)

        //returns the length of the LinkedList as an integer value

        //set the count variable to 0 
        let count = 0

        //get the current linked list by the head 
        let current = this.head

        //using a while loop
        while (current) {
            //initialize a 'next' variable and set the pointer property of the current node as its value
            let next = current.next

            //if theres a node, add to count by one
            if (current) {
                count++
            }
            //then go on to the next node
            current = next
        }
        //once current node is false (null, nonexistent) return count
        return count
    }

}


// Question 2: Cycle Check
const isCyclic = (headNode) => {
    //returns true is the list has a cycle, false otherwise
    //initializing the slow variable, which will hold a node and as you go through the linked list, will continue to hold one node at a time
    let slow = headNode
    //initializing the fast variable, which will hold the next node and as you go through the linked list, will 
    //continue ahead of the slow node by two nodes to check if a later node loops back to a previous node (by comparing it to the slow node)
    let fast = headNode.next

    //while looping through the linked list
    while (fast && fast.next) {
        //checking if slow is ever equal to fast
        if (slow === fast) {
            return true
        }

        //if not, moving slow and fast onwards
        slow = slow.next
        fast = fast.next.next
    }
    //if the loop condition is never met, return false 
    return false
};

// Question 3: Reverse a Linked List
const reverse = (headNode) => {
    //returns the new headNode

    //create 3 temp variables 
    //previous is going to be equal to null at the very beginning, since null (or empty space) wraps around the linked list

    //at the start, previous HAS to be null and current HAS to be the headnode. it doesn't really matter what the next variable is equal to in the beginning.
    let previous = null
    let next = previous
    let current = headNode

    //start traversing! yay! 
    //or while(current !== null), because 
    while (current) {
        //Reassign the next variable so that it points to what comes after the current node.
        next = current.next

        //reverse the pointer of the current node to point back to the previous node 
        current.next = previous

        //now move current along, so previous is now equal to current (making the algorithm move the current node into previous) 
        previous = current

        //now make the next node the current node 
        current = next

        //since the current node is now the next node, make next the current node's next node
        // next = current.next 
        //but since the while loop starts with this in the very beginning of a new cycle, we don't have to put [next = current.next] at the bottom.
    }

    //returning previous returns the new head node, which returns the rest of the linked list! 
    return previous
};

// Question 4: Merge Two Lists
const mergeLists = (head1, head2) => {
    //returns the head node of the merged linked list

    //must havr a dummy that creates new node

    //used to start new linked lists
    const dummy = new Node()

    //assign headNode to variable 
    let curr1 = head1
    let curr2 = head2

    let tail = dummy

    // let tail1 = null;
    //why curr1 instead of .next 
    while (curr1 && curr2) {
        //comparing the data 
        if (curr1.data > curr2.data) {
            tail.next = curr2
            curr2 = curr2.next
        } else {
            tail.next = curr1
            curr1 = curr1.next
        }
        //tail continues on to new node addition, and its aptly named as it will be the tail until the end! thank you Andy
        tail = tail.next

    }

    //additional if statements
    if (curr1) tail.next = curr1
    if (curr2) tail.next = curr2

    //returning dummy.next orphans the empty head and returns the new linked list 
    return dummy.next

};

let firstNode = new Node(1);
let secondNode = new Node(2);
let thirdNode = new Node(4);
firstNode.next = secondNode;
secondNode.next = thirdNode;

let fourthNode = new Node(1);
let fifthNode = new Node(3);
let sixthNode = new Node(4);
fourthNode.next = fifthNode;
fifthNode.next = sixthNode;

firstNode = mergeLists(firstNode, fourthNode);
console.log(firstNode)

// Question 5: Remove duplicates
//time comp: O(n) // n = # nodes in list, while loop
// 
const removeDuplicates = (headNode) => {
    //returns the headNode
    let curr = headNode
    // let next = curr.next
    let freq = new Set([curr.data])

    //while there is a node next in line,
    while (curr.next) {
        //store the node that comes next in a variable 'next'
        let next = curr.next;

        //checking if freak has the duplicate data inside the node, not that it has a whole node.  
        if (freq.has(next.data)) {
            //orphans the next node by checking if its data matches existing node data in the set, and if it does,
            //making the current node's next property point to the node AHEAD of the next node. So the next node with the duplicate data is orphaned (dropped out of the linked list).
            curr.next = next.next
        } else {
            //add the new data to the set if the current node's data is new, not a duplicate
            freq.add(next.data)
            //this is how you continue through a linked list
            //reassign current to be the next variable 
            curr = next
            //after making the next node the current node, reassign next to the node that comes NEXT after current (curr.next)
            // next = curr.next
        }
    }

    //returning the headNode always returns the nodes chained to it, so it'll return the linked list without the duplicate data 
    return headNode
};

module.exports = {
    Node, LinkedList, isCyclic, reverse, mergeLists, removeDuplicates
}